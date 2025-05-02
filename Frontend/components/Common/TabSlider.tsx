import { useEffect, useRef, useState } from "react";

let allTabs = [
    {
      id: "home",
      name: "Tất cả",
    },
    {
      id: "blog",
      name: "Đang xử lý",
    },
  ];
  interface CustomDropdownProps {
    allTabs: any
    onSelectOption: (option: any) => void;
  }
  export const TabSlider:React.FC<CustomDropdownProps> = ({
    allTabs,
    onSelectOption,
  }) => { 
    const tabsRef = useRef<(HTMLElement | null)[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  
    useEffect(() => {
      if (activeTabIndex === null) {
        return;
      }
  
      const setTabPosition = () => {
        const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
        setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
        setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
      };
  
      setTabPosition();
    }, [activeTabIndex]);

    const handleSelect =(index, status) => {
        setActiveTabIndex(index)
        onSelectOption(status)
    }
    const handleButtonRef = (el: HTMLButtonElement, id: number) => {
      // Store the element reference here (e.g., in a state variable)
      tabsRef.current[id] = el
    };
    return (
      <div className="flew-row relative cursor-pointer flex h-12 rounded-3xl border border-white/40  bg-xanh_duong px-2 backdrop-blur-sm">
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full rounded-3xl bg-gray-400/30 " />
        </span>
        {allTabs.map((tab) => {
          const isActive = activeTabIndex === tab.id;
  
          return (
            <button
              key={tab.id}
              ref={(el)=> handleButtonRef(el ,tab.id) }
              className={`${
                isActive ? `` : ``
              } cursor-pointer select-none rounded-full px-4 text-center font-medium text-white `}
              onClick={() => handleSelect(tab.id, tab.value)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    );
  };