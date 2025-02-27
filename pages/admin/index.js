const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
export default function AdminIndex() {
  if (typeof window !== "undefined") {
    window.location.replace(isStaticExport ? "/admin/astar.html" : "/admin/astar")
  }
} 