import { Module } from "vuex-module-decorators";
import RepositoryModule from "@/store/utils/repository-module";
import { TutoriaRepository, Tutoria } from "@/api/repositories/tutorias";

@Module({ namespaced: true, name: "tutorias" })
export default class TutoriaModule extends RepositoryModule<Tutoria> {
  repository = new TutoriaRepository();
}
