import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createContent } from 'apiSdk/contents';
import { Error } from 'components/error';
import { contentValidationSchema } from 'validationSchema/contents';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StartupInterface } from 'interfaces/startup';
import { getStartups } from 'apiSdk/startups';
import { ContentInterface } from 'interfaces/content';

function ContentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ContentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createContent(values);
      resetForm();
      router.push('/contents');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ContentInterface>({
    initialValues: {
      title: '',
      description: '',
      startup_id: (router.query.startup_id as string) ?? null,
    },
    validationSchema: contentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Content
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
            {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<StartupInterface>
            formik={formik}
            name={'startup_id'}
            label={'Select Startup'}
            placeholder={'Select Startup'}
            fetcher={getStartups}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'content',
  operation: AccessOperationEnum.CREATE,
})(ContentCreatePage);
