export default function Footer() {
  return (
    <footer className="bg-white border-t border-default-200">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-xs text-center text-default-500">
          &copy; {new Date().getFullYear()} FERU. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

