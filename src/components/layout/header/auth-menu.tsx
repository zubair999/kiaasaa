import Link from "@components/ui/link";
interface Props {
  href: string;
  className?: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
  CustomerDetail: any;
}

const AuthMenu: React.FC<Props> = ({
  CustomerDetail,
  isAuthorized,
  href,
  className,
  btnProps,
  children,
}) => {
  return isAuthorized ? (
    <Link href={href} className={className}>
      {CustomerDetail.customer_name}
    </Link>
  ) : (
    <button {...btnProps} />
  );
};

export default AuthMenu;
