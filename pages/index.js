const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
export default function Home() {
  if (typeof window !== "undefined") {
    window.location.replace(isStaticExport ? "/astar.html" : "/astar")
  }
}
