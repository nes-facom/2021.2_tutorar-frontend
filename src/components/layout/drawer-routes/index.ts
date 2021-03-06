import rotasMonitorDrawer from "@/components/layout/drawer-routes/rotas-monitor-drawer"
import rotasProfessorDrawer from "@/components/layout/drawer-routes/rotas-professor-drawer"
import rotasTutorandoDrawer from "@/components/layout/drawer-routes/rotas-tutor-drawer"

export const rotasMonitor = rotasMonitorDrawer
export const rotasProfessor = rotasProfessorDrawer
export const rotasTutorando = rotasTutorandoDrawer

export interface DrawerRoute {
  to?: string
  icon: string
  title: string
  subrotas?: DrawerRoute[]
}
