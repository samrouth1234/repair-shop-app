import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="shadow-lg border py-4 px-5">
      <div className="flex justify-between">
        <section>
          <h2 className="text-xl">Khmeng Coder</h2>
        </section>
        <section className="flex gap-5">
          <Link href={"/dashboard"} className="hover:text-red-400 hover:underline"> Dashboard</Link>
          <Link href={"/customers"} className="hover:text-red-400 hover:underline"> Customer</Link>
          <Link href={"/tickets"} className="hover:text-red-400 hover:underline"> Ticket</Link>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
