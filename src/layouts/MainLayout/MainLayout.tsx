import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

interface Props {
    children?: React.ReactNode
}

function MainLayout({ children }: Props) {
    const navigate = useNavigate();

    const handeSubmitLogout = () => {
        navigate('/login');
        localStorage.clear()
    }

    return (
        <>
            <header>Header here
                <button onClick={handeSubmitLogout}>Logout</button>
            </header>
            <aside>Sidebar here</aside>
            {children}
            <Footer />
        </>
    );
}

export default MainLayout;