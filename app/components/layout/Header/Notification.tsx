import Link from "next/link";
function Notification({
  href,
  text,
  date,
}: {
  href: string;
  text: string;
  date: string;
}) {
  return (
    <Link
      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
      href="#"
    >
      <p className="text-sm">{text}</p>

      <p className="text-xs">{date}</p>
    </Link>
  );
}

export default Notification;
