import Footer from '../../components/Footer';

interface Props {
    children?: React.ReactNode
}

function AuthLayout({ children }: Props) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

export default AuthLayout;