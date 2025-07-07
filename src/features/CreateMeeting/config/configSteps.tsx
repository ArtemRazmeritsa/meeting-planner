type FormData = {
  title: string;
  dates: Date[];
};

type Step = {
  path: string;
  title: string;
  validate: (arg: FormData) => boolean;
};

export const steps: Step[] = [
  {
    path: 'title',
    title: 'Название встречи',
    validate: () => true,
  },
  {
    path: 'dates',
    title: 'Выберите даты',
    validate: (data) => data.title.trim().length > 0,
  },
  {
    path: 'final',
    title: 'Проверьте данные встречи',
    validate: (data) => data.dates.length > 0,
  },
];
