export default function Footer() {
    return (
        <footer className="py-5 px-4 text-center text-gray-600 dark:text-gray-300">
            <small>
                &copy; {new Date().getFullYear()} Ali Abbasov. All rights
                reserved.
            </small>
        </footer>
    );
}
