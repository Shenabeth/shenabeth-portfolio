/*
 * File: ProjectVisual.tsx
 * Purpose: The media that fills a featured-project card's visual panel. If the
 *          project supplies an `imageUrl`, that screenshot is shown contained
 *          in the panel — the whole shot stays visible whatever its native
 *          ratio, and the panel's hatch fills the margins. Otherwise a
 *          hand-built, on-brand
 *          illustration is rendered as a finished stand-in — not a "replace me"
 *          placeholder. Each known project id has its own illustration so the
 *          panel always communicates what the project is.
 */

import { PortfolioSiteArt } from '@/components/projects/visuals/PortfolioSiteArt';
import { SaiSystemArt } from '@/components/projects/visuals/SaiSystemArt';
import { DogGameArt } from '@/components/projects/visuals/DogGameArt';

interface ProjectVisualProps {
  /** Project id — selects the built-in illustration when no image is given. */
  id: string;
  /** Project title — used for alt text / the fallback label. */
  title: string;
  /** Optional screenshot URL. When present it takes priority over the art. */
  imageUrl?: string;
}

/** Map of project id → its bespoke illustration. */
const ART_BY_ID: Record<string, React.ReactElement> = {
  'portfolio-site': <PortfolioSiteArt />,
  'sai-system': <SaiSystemArt />,
  'dog-game': <DogGameArt />,
};

/**
 * Render a project's visual: a real screenshot when provided, else the
 * project's built-in illustration (or a titled frame as a last resort).
 *
 * @param id - Project id
 * @param title - Project title, used for the image alt text
 * @param imageUrl - Optional screenshot URL
 * @returns The media node that fills a `.project-visual` frame
 */
export function ProjectVisual({ id, title, imageUrl }: ProjectVisualProps): React.ReactElement {
  if (imageUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- plain <img>
         keeps the static-export/Amplify path simple; the site uses no
         next/image elsewhere. */
      <img src={imageUrl} alt={`${title} preview`} className="project-visual-img" />
    );
  }

  return ART_BY_ID[id] ?? (
    <div className="project-visual-fallback">
      <p>{title}</p>
    </div>
  );
}
