import {
  IdentifiableItem,
  BaseRepository
} from "@/api/repositories/base-repository";

import handleAxiosError from "@/api/axiosErrorHandler";

export interface Tutoria extends IdentifiableItem {
  xd?: string;
}

export class TutoriaRepository extends BaseRepository<Tutoria> {

  create(tutoria: Tutoria) {
    return new Promise<boolean>((resolve, reject) => {
      this.axiosInstance.post("", tutoria).then(res => {
        res ? resolve(true) : reject();
      });
    });
  }

  update(id: number, tutoria: Tutoria) {
    return new Promise<boolean>((resolve, reject) => {
      this.axiosInstance.post("", { id, tutoria }).then(res => {
        res ? resolve(true) : reject();
      });
    });
  }

  delete(id: number) {
    return new Promise<boolean>((resolve, reject) => {
      this.axiosInstance.post("", id).then(res => {
        res ? resolve(true) : reject();
      });
    });
  }

  get(options?: object) {
    return new Promise<Tutoria[]>((resolve, reject) => {
      this.axiosInstance
        .post("", options)
        .then(res => {
          res ? resolve([{ id: 1 }]) : reject();
        })
        .catch(error => {
          const errorMessage = handleAxiosError(
            error,
            "Ocorreu um erro ao buscar as Tutorias"
          );
          reject(errorMessage);
        });
    });
  }

  find(id: number) {
    return new Promise<Tutoria>((resolve, reject) => {
      this.axiosInstance.post("", id).then(res => {
        res ? resolve({ id: 1 }) : reject();
      });
    });
  }
}
