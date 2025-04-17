import style from "../../assets/scss/common/header.module.scss";
import {HeaderStatus} from "./Header";

// SubMenu enum 업데이트 (HeaderStatus에 맞춤)
export enum SubMenu {
    COMMUNITY = "커뮤니티",
}

interface ButtonData {
    label: string;
    page: string;
    status: HeaderStatus;
    subMenu: { title: SubMenu; subItems: string[] }[];
}

interface Args {
    selectedButtons: ButtonData[];
    headerStatus: HeaderStatus;
    activeButton: number | null;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    onClickChangePage: (page: string, status: HeaderStatus) => void;
}

export function MenuButton(
    {
        selectedButtons,
        headerStatus,
        activeButton,
        onMouseEnter,
        onMouseLeave,
        onClickChangePage,
    }
    : Args) {

    const onClickChangSubPage = (menu: SubMenu) => {
        switch (menu) {
            case SubMenu.COMMUNITY:
                return window.location.href = '/community';
            default:
                return "/";
        }
    }

    const SubItems = ({items, onClick}: { items: string[], onClick: (_: any) => void }) => (
        <ul className={style.subItems}>
            {items.map((item, index) => (
                <li key={index} onClick={() => onClick(item)}>
                    {item}
                </li>
            ))}
        </ul>
    );

    const SubMenus = ({menu, onMenuClick, onSubItemClick}:
                      {
                          menu: { title: SubMenu, subItems: string[] }[],
                          onMenuClick: (_: any) => void,
                          onSubItemClick: (_: any) => void
                      }) => (
        <div className={style.subMenu}>
            <ul>
                {menu.map((menuItem, index) => (
                    <li key={index}>
                        <span onClick={() => onMenuClick(menuItem.title)} className={style.subMenuTitle}>{menuItem.title}</span>

                        {/* 하위 항목이 있는 경우 SubItems 컴포넌트 렌더링 */}
                        {menuItem.subItems && menuItem.subItems.length > 0 && (
                            <SubItems items={menuItem.subItems} onClick={onSubItemClick}/>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
    return (
        <>
            {selectedButtons.map((data, idx) => (
                <div
                    key={idx}
                    onMouseEnter={() => onMouseEnter(idx)} // Mouse enter event
                    onMouseLeave={onMouseLeave} // Mouse leave event
                    className={style.buttonContainer}
                >
                    <button
                        onClick={() => onClickChangePage(data.page, data.status)}
                        className={`${style.buttonStyle} ${headerStatus === data.status ? style.selected : ''}`}
                    >
                        {data.label}
                    </button>

                    {data.subMenu && data.subMenu.length > 0 && activeButton === idx && (
                        <SubMenus
                            menu={data.subMenu}
                            onMenuClick={(title: SubMenu) => onClickChangSubPage(title)}
                            onSubItemClick={(subItem: SubMenu) => onClickChangSubPage(subItem)}
                        />
                    )}
                </div>
            ))}
        </>
    );
}