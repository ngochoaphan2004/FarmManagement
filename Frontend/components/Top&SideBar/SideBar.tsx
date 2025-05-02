import { useState } from "react";
import Side from "./Side";
import {
  ReceiptLong,
} from "@mui/icons-material";
import { FiPrinter } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiOutlineFile } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";  // Thêm icon location

const SideItemData = [
  {
    id: 0,
    title: "Máy in",
    url: "/printer",
    icon: <FiPrinter className="text-2xl lg:block" />,
  },
  {
    id: 1,
    title: "Người dùng",
    url: "/user",
    icon: <FaUsers className="text-2xl lg:block" />,
  },
  {
    id: 2,
    title: "Hoá đơn",
    url: "/payment",
    icon: <BsCashCoin className="text-2xl lg:block" />,
  },
  {
    id: 3,
    title: "Định dạng tệp",
    url: "/fileformat",
    icon: <AiOutlineFile className="text-2xl lg:block" />,
  },
  {
    id: 4,  // Sửa lại id để tránh trùng
    title: "Địa điểm máy in",
    url: "/location",
    icon: <MdLocationOn className="text-2xl lg:block" />,  // Cập nhật icon
  },
  {
    id: 5,
    title: "Cấp giấy",
    url: "/pageAlloc",
    icon: <AiOutlineFile className="text-2xl lg:block" />,
  }
];

export default function SideBar({ toggleCollapse }) {
  const [dropdown, Setdropdown] = useState(false);
  return (
    <Side
      menuItems={SideItemData}
      toggleCollapse={toggleCollapse}
    />
  );
}
