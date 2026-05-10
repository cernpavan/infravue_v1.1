/**
 * Renders a JSON-LD <script> tag with the structured-data payload.
 * Server component — no hydration cost.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered only; the JSON is built from typed data in our own
      // code, never user input — so dangerouslySetInnerHTML is safe here.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
