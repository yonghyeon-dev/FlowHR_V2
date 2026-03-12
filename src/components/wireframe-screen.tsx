import type { WireframePage } from "@/lib/wireframes";

export function WireframeScreen({ screen }: { screen: WireframePage }) {
  return (
    <div className="wireframe-root">
      {screen.styles ? <style dangerouslySetInnerHTML={{ __html: screen.styles }} /> : null}
      <div
        dangerouslySetInnerHTML={{
          __html: screen.body,
        }}
      />
    </div>
  );
}
