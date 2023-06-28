import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  startup_id: yup.string().nullable(),
});
