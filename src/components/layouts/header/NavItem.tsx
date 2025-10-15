import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
  isActive?: boolean;
  onNavItemClick?: (href: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  hasDropdown = false,
  isActive = false,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`font-michroma hover:text-brand-orange-500 xxl:text-sm flex cursor-pointer items-center gap-0 border-none bg-transparent text-[9px] tracking-[1px] duration-300 md:text-[10px] xl:rotate-180 xl:[writing-mode:vertical-rl] ${
          isActive ? "text-brand-orange-500" : "text-white"
        }`}
      >
        <span>{children}</span>
        {hasDropdown && (
          <>
            <ChevronLeft
              className="hidden xl:block mr-1"
              size={16}
              color="#f65009"
            />{" "}
            <ChevronDown
              className="block xl:hidden"
              size={16}
              color="#f65009"
            />
          </>
        )}
      </Link>
    </li>
  );
};

export default NavItem;
