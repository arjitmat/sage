"""
Sage - Image Generator using Nano Banana Pro (Gemini 3 Pro Image)
Generates custom visuals for slide presentations with accurate text rendering
"""

import os
import base64
import io
from typing import Dict, Optional
from google import genai
from google.genai import types


class ImageGenerator:
    """Generate custom images using Nano Banana Pro for slides"""

    def __init__(self, client: genai.Client):
        """Initialize with Gemini client"""
        self.client = client
        # Use Nano Banana Pro (Gemini 3 Pro Image) - same as NotebookLM
        # Superior text rendering for infographics and data visualizations
        self.model = "gemini-3-pro-image-preview"

    def generate_slide_visual(
        self,
        slide_content: Dict,
        visual_type: str,
        document_context: str = ""
    ) -> Optional[str]:
        """
        Generate custom image for slide using Nano Banana Pro

        Args:
            slide_content: Dict with 'title' and 'bullets'
            visual_type: Type of visual (bar_chart, pie_chart, stats_grid, icon_grid)
            document_context: Document text for contextual understanding

        Returns:
            Base64 encoded image string or None
        """
        try:
            # Create detailed, contextual prompt
            prompt = self._create_prompt(slide_content, visual_type, document_context)

            # Generate image using Gemini with Nano Banana Pro
            # Using response_modalities to specify image output
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                )
            )

            # Extract image from response - correct path is response.candidates[0].content.parts
            if response.candidates and len(response.candidates) > 0:
                candidate = response.candidates[0]
                if candidate.content and candidate.content.parts:
                    for part in candidate.content.parts:
                        # Check if part has image data
                        if hasattr(part, 'inline_data') and part.inline_data:
                            # Get image bytes and encode to base64
                            image_bytes = part.inline_data.data
                            mime_type = part.inline_data.mime_type

                            # Properly encode bytes to base64 string
                            if isinstance(image_bytes, bytes):
                                image_b64 = base64.b64encode(image_bytes).decode('utf-8')
                            else:
                                # Already a string
                                image_b64 = image_bytes

                            # Return as data URL
                            return f"data:{mime_type};base64,{image_b64}"

            return None

        except Exception as e:
            print(f"Nano Banana image generation failed: {str(e)}")
            import traceback
            traceback.print_exc()
            return None

    def _create_prompt(self, slide_content: Dict, visual_type: str, document_context: str = "") -> str:
        """Create contextual, detailed prompt for Nano Banana Pro - focus on explanatory visuals"""
        title = slide_content.get('title', '')
        bullets = slide_content.get('bullets', [])
        bullets_text = '\n'.join(f"- {b}" for b in bullets[:3]) if bullets else ""

        # Extract document theme/topic for context
        context_snippet = document_context[:600] if document_context else ""

        base_style = "Professional infographic for business presentation, modern minimalist design, high quality, clean typography, data visualization"

        if visual_type == 'bar_chart':
            return f"""Create a SELF-EXPLANATORY bar chart infographic that EXPLAINS the concept: "{title}"

DOCUMENT CONTEXT FOR UNDERSTANDING:
{context_snippet}

KEY POINTS TO VISUALIZE:
{bullets_text if bullets_text else "Derive the key comparisons from the title and context"}

CORE REQUIREMENT: This visual must TELL THE STORY on its own. A viewer should understand the main insight without reading bullet points.

SPECIFIC INSTRUCTIONS:
- Create a bar chart comparing 3-5 specific concepts/metrics from the document
- Use clear, readable labels that name the actual concepts being compared
- Include specific numbers, percentages, or values on the bars
- Add a descriptive subtitle under the main title that explains what's being compared
- Use color coding to show positive/negative or different categories
- The visual should answer: "What is being compared?" and "What's the key insight?"
- Make labels and numbers LARGE and LEGIBLE - this is critical

Style: {base_style}, explanatory chart with clear annotations, professional color scheme"""

        elif visual_type == 'pie_chart':
            return f"""Create a SELF-EXPLANATORY pie/donut chart infographic that EXPLAINS: "{title}"

DOCUMENT CONTEXT FOR UNDERSTANDING:
{context_snippet}

KEY BREAKDOWN TO SHOW:
{bullets_text if bullets_text else "Derive the key distribution from the title and context"}

CORE REQUIREMENT: This visual must TELL THE STORY on its own about composition or distribution.

SPECIFIC INSTRUCTIONS:
- Create a pie/donut chart showing 3-5 segments representing actual categories from the document
- Each segment must have: clear label, percentage value, and be visually distinct
- Add a legend with segment names if space allows
- Include a subtitle explaining what the breakdown represents
- Use contrasting colors for easy differentiation
- The visual should answer: "What's the whole?" and "How is it distributed?"
- Make labels and percentages LARGE and LEGIBLE - critical for readability

Style: {base_style}, explanatory distribution chart with clear segment labels and percentages"""

        elif visual_type == 'stats_grid':
            return f"""Create a SELF-EXPLANATORY statistics dashboard infographic for: "{title}"

DOCUMENT CONTEXT FOR UNDERSTANDING:
{context_snippet}

KEY METRICS TO HIGHLIGHT:
{bullets_text if bullets_text else "Derive the key quantifiable insights from the title and context"}

CORE REQUIREMENT: This visual must COMMUNICATE KEY NUMBERS at a glance.

SPECIFIC INSTRUCTIONS:
- Create a KPI dashboard with 3-4 prominent statistics in a grid layout
- Each metric card must have: large number/percentage, descriptive label, and contextual icon
- Numbers should be specific and meaningful (extract from context or make data-driven estimates)
- Use visual hierarchy - numbers should be the LARGEST element
- Include units (%, K, M, $, etc.) clearly displayed
- Add subtle trend indicators (arrows, colors) if relevant
- The visual should answer: "What are the key quantifiable insights?"
- Make numbers VERY LARGE and labels CLEAR - this is the primary focus

Style: {base_style}, modern KPI dashboard with emphasis on numerical data, clean card design"""

        elif visual_type == 'icon_grid':
            return f"""Create a SELF-EXPLANATORY icon-based infographic illustrating: "{title}"

DOCUMENT CONTEXT FOR UNDERSTANDING:
{context_snippet}

KEY CONCEPTS/STEPS TO SHOW:
{bullets_text if bullets_text else "Derive the key concepts or process steps from the title and context"}

CORE REQUIREMENT: This visual must EXPLAIN A PROCESS, FRAMEWORK, or CONCEPT VISUALLY.

SPECIFIC INSTRUCTIONS:
- Create 3-5 distinct icons representing key concepts, steps, or components from the document
- Each icon must have: clear visual symbol, concise label underneath (2-4 words max)
- Arrange in a logical flow (left-to-right for processes, grid for components)
- Use visual connectors (arrows, lines) if showing a process or sequence
- Icons should be simple, recognizable, and thematically consistent
- The visual should answer: "What are the key elements?" or "What's the process/framework?"
- Make icon labels CLEAR and READABLE

Style: {base_style}, modern conceptual diagram with clear icons and labels, visual flow"""

        elif visual_type == 'comprehensive_infographic':
            # Special case for one-page visual summary
            return f"""Create a COMPREHENSIVE ONE-PAGE INFOGRAPHIC that summarizes the entire document.

TITLE: {title}

DOCUMENT CONTENT:
{context_snippet}

KEY HIGHLIGHTS:
{bullets_text if bullets_text else "Derive key insights from the document"}

CORE REQUIREMENT: This is a COMPLETE visual summary - a standalone infographic that tells the full story.

INFOGRAPHIC MUST INCLUDE:
1. BOLD HEADER at top with the main title
2. 3-4 LARGE KPI/STAT CARDS with big numbers and labels
3. MAIN CONTENT AREA with 2-3 sections using:
   - Icons representing key concepts
   - Brief text labels
   - Simple diagrams or visual elements
4. DATA VISUALIZATION section with a chart (bar, pie, timeline, or process flow)
5. KEY TAKEAWAYS section with 2-3 highlighted points

DESIGN REQUIREMENTS:
- Professional business infographic layout
- Cohesive color scheme (use blues, teals, or sage greens for consistency)
- Clear visual hierarchy - most important elements are largest
- Grid-based layout for organization
- Mix of text, numbers, icons, and charts
- All text VERY LARGE and LEGIBLE - this is critical
- Balanced composition with white space
- Modern, clean, professional appearance

STYLE: Professional one-page infographic, business presentation quality, modern data visualization, clean information design, high quality"""

        else:
            # Conceptual illustration for content
            return f"""Create a SELF-EXPLANATORY conceptual infographic for: "{title}"

DOCUMENT CONTEXT FOR UNDERSTANDING:
{context_snippet}

KEY IDEAS TO VISUALIZE:
{bullets_text if bullets_text else "Derive the key concepts from the title and context"}

CORE REQUIREMENT: This visual must EXPLAIN THE CONCEPT through visual metaphor and clear information design.

SPECIFIC INSTRUCTIONS:
- Create a conceptual diagram, flowchart, or visual metaphor representing the key idea
- Use a combination of: simple illustrations, icons, arrows, labels, and minimal text
- Show relationships, connections, or hierarchies between concepts
- Include a subtitle or annotation that clarifies what's being shown
- Use visual hierarchy to guide the eye through the information
- The visual should answer: "What is this concept about?" and "How does it work?"
- Make all text elements LARGE and LEGIBLE

Style: {base_style}, explanatory diagram with clear visual hierarchy, professional educational design"""
