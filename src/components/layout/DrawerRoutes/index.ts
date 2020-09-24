import rotasProfessorDrawer from "@/components/layout/DrawerRoutes/rotasProfessorDrawer";
import rotasTutorandoDrawer from "@/components/layout/DrawerRoutes/rotasTutorandoDrawer";

export const rotasProfessor = rotasProfessorDrawer;
export const rotasTutorando = rotasTutorandoDrawer;

export interface DrawerRoute {
  to?: string;
  icon: string;
  title: string;
  subrotas?: DrawerRoute[];
}
