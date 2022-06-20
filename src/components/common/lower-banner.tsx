import Text from '@components/ui/text';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';

const data = {
  title: 'common:text-subscribe-heading',
  description: 'common:text-subscribe-description',
  buttonText: 'common:button-subscribe',
};

interface Props {
  className?: string;
}

type FormValues = {
  subscription_email: string;
};

const defaultValues = {
  subscription_email: '',
};

const lowerBanner: React.FC<Props> = ({
  className = 'px-5 sm:px-8 md:px-16 2xl:px-0',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const { locale } = useRouter();  
  const { t } = useTranslation();
  const { title, description, buttonText } = data;
  async function onSubmit(input: FormValues) {
    console.log(input, 'data');
  }
  return (
    <div
      className={`${className} relative overflow-hidden flex flex-col sm:items-center lg:items-start rounded-lg bg-gray-200 md:py-52 lg:py-56`}
    >
      {/* <div className="-mt-1.5 lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0">
        <Text
          variant="mediumHeading"
          className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5"
        >
          {t(`${title}`)}
        </Text>
        <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
          {t(`${description}`)}
        </p>
      </div>    */}
      <div
        style={{
          backgroundImage:'url(/assets/images/banner/banner-imag-kiasa.jpg)',
        }}
        className={`hidden z-0 xl:block bg-no-repeat bg-contain xl:bg-cover 3xl:bg-contain absolute h-full w-full top-0`}
      />
    </div>
  );
};

export default lowerBanner;
