export function RawWireframeMain({ markup }: { markup: string }) {
  return <div className="raw-main-content" dangerouslySetInnerHTML={{ __html: markup }} />;
}
