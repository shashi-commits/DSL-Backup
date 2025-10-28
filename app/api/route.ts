import { NextRequest, NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';
import destinations from '../../data/destinations.json';

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: '2024-02-15-preview',
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
});

interface Recommendation {
  destination: string;
  reason: string;
  categories: string[];
  highlights: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' }, 
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedQuery = query.trim().slice(0, 500);
    
    if (sanitizedQuery.length === 0) {
      return NextResponse.json(
        { error: 'Query cannot be empty' }, 
        { status: 400 }
      );
    }

    // Prepare destination data for AI
    const destinationContext = destinations.destinations.map(dest => ({
      name: dest.name,
      region: dest.region,
      categories: dest.categories,
      overview: dest.overview,
      activities: dest.activities,
      nearbyAttractions: dest.nearbyAttractions
    }));

    const systemPrompt = `You are a Sri Lankan tourism expert. Based on the user's query, recommend 4-6 destinations from the provided dataset that best match their interests. 

Available destinations: ${JSON.stringify(destinationContext, null, 2)}

For each recommendation, provide:
1. The exact destination name (must match the dataset)
2. A brief reason why it fits their query (2-3 sentences)
3. The categories it belongs to
4. 2-3 key highlights

Respond in JSON format:
{
  "recommendations": [
    {
      "destination": "exact name from dataset",
      "reason": "why this destination matches their query",
      "categories": ["category1", "category2"],
      "highlights": ["highlight1", "highlight2", "highlight3"]
    }
  ]
}

Focus on destinations that genuinely match the user's interests. If they mention specific activities, prioritize destinations known for those activities.`;

    const completion = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: sanitizedQuery }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI service');
    }

    let recommendationsData;
    try {
      recommendationsData = JSON.parse(aiResponse);
    } catch (error) {
      console.error('Failed to parse AI response:', aiResponse, error);
      throw new Error('Invalid response format from AI service');
    }

    // Validate and enrich recommendations with full destination data
    const enrichedRecommendations = recommendationsData.recommendations
      ?.map((rec: Recommendation) => {
        const fullDestination = destinations.destinations.find(
          dest => dest.name.toLowerCase() === rec.destination.toLowerCase()
        );
        
        if (!fullDestination) {
          console.warn(`Destination not found: ${rec.destination}`);
          return null;
        }

        return {
          ...rec,
          id: fullDestination.id,
          fullDestination
        };
      })
      .filter(Boolean)
      .slice(0, 6); // Limit to 6 recommendations

    if (!enrichedRecommendations || enrichedRecommendations.length === 0) {
      return NextResponse.json({
        recommendations: [],
        message: "I couldn't find specific destinations matching your query. Please try a different search."
      });
    }

    return NextResponse.json({
      recommendations: enrichedRecommendations,
      query: sanitizedQuery
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    
    // Provide fallback recommendations
    const fallbackRecommendations = [
      {
        destination: "Galle",
        reason: "A perfect blend of history and beaches, offering cultural exploration and coastal relaxation.",
        categories: ["Cultural & Historical", "Beach & Coastal"],
        highlights: ["UNESCO World Heritage Fort", "Beautiful beaches", "Colonial architecture"],
        id: "galle",
        fullDestination: destinations.destinations.find(d => d.id === 'galle')
      },
      {
        destination: "Kandy",
        reason: "The cultural heart of Sri Lanka with sacred temples and beautiful hill country scenery.",
        categories: ["Cultural & Historical", "Religious & Spiritual"],
        highlights: ["Temple of the Tooth", "Royal Botanical Gardens", "Cultural performances"],
        id: "kandy",
        fullDestination: destinations.destinations.find(d => d.id === 'kandy')
      }
    ];

    return NextResponse.json({
      recommendations: fallbackRecommendations,
      message: "We're experiencing high demand. Here are some popular destinations to explore:",
      fallback: true
    });
  }
}