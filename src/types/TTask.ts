export type TTask = {
  id: number;
  name: string;
  datestart: number;
  dateend: number;
  started: boolean;
  ended: boolean;
  user: string;
};

export type TTaskGetResponse = {
  id: number;
  name: string;
  datestart: number;
  dateend: number;
  started: boolean;
  ended: boolean;
  user: string;
}

export type TTaskCreate = {
  task: string;
  started: boolean;
}

export type TTaskCreateStart = {
  id: number;
  task: string;
  started: boolean;
  user: string;
}

export type TTaskCreateResponse = {
  createdTask: {
    dateend: string;
    datestart: string;
    task: string;
    ended: boolean;
    id: number;
    started: boolean;
    user: string;
  }
}
