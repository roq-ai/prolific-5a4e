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
import { createSubscription } from 'apiSdk/subscriptions';
import { Error } from 'components/error';
import { subscriptionValidationSchema } from 'validationSchema/subscriptions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { StartupInterface } from 'interfaces/startup';
import { getUsers } from 'apiSdk/users';
import { getStartups } from 'apiSdk/startups';
import { SubscriptionInterface } from 'interfaces/subscription';

function SubscriptionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SubscriptionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSubscription(values);
      resetForm();
      router.push('/subscriptions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SubscriptionInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      startup_id: (router.query.startup_id as string) ?? null,
    },
    validationSchema: subscriptionValidationSchema,
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
            Create Subscription
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
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
  entity: 'subscription',
  operation: AccessOperationEnum.CREATE,
})(SubscriptionCreatePage);
