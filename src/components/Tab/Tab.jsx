import { useNavigate } from 'react-router-dom'
import { useSortable } from '@dnd-kit/sortable'
import { useState, useRef, useEffect, forwardRef } from 'react'
import Thumb from '../../assets/thumbtack.svg'
import Logo from '../../assets/fi-rs-box-alt.svg?react'

const Tab = forwardRef(({ tab, className, togglePin, setSelectedTab }, forwardedRef) => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tab.id })

    const style = {
        transition,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
    }

    const handleContextMenu = (e) => {
        e.preventDefault()
        setMenuPosition({ top: e.clientY + 10, left: e.clientX })
        setShowMenu(true)
    }

    const handleMouseLeave = () => {
        setShowMenu(false)
    }

    useEffect(() => {
        if (showMenu && menuRef.current) {
            const menuWidth = menuRef.current.offsetWidth
            const menuHeight = menuRef.current.offsetHeight
            let top = menuPosition.top
            let left = menuPosition.left

            let needsUpdate = false

            if (top + menuHeight > window.innerHeight) {
                top = window.innerHeight - menuHeight
                needsUpdate = true
            }

            if (left + menuWidth > window.innerWidth) {
                left = window.innerWidth - menuWidth
                needsUpdate = true
            }

            if (needsUpdate) {
                setMenuPosition({ top, left })
            }
        }
    }, [showMenu, menuPosition])

    return (
        <div
            data-id={tab.id}
            onClick={() => {
                navigate(tab.url)
                setSelectedTab(tab.id)
            }}
            className={`tab ${className}`}
            ref={(node) => {
                setNodeRef(node)
                if (!forwardedRef) return
                if (typeof forwardedRef === 'function') {
                    forwardedRef(node)
                } else {
                    forwardedRef.current = node
                }
            }}
            style={style}
            {...attributes}
            {...listeners}
            id={`tab-${tab.id}`}
            onContextMenu={handleContextMenu}
            onMouseLeave={handleMouseLeave}
        >
            {tab.isPinned ? (
                <Logo />
            ) : (
                <>
                    <Logo style={{ marginRight: '5px' }} />
                    {tab.title}
                </>
            )}
            {showMenu && (
                <div
                    className="context-menu"
                    ref={menuRef}
                    onClick={(e) => {
                        e.stopPropagation()
                        togglePin(tab)
                        setShowMenu(false)
                    }}
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`
                    }}
                >
                    {tab.isPinned ? (
                        <div>
                            <Logo style={{ marginBottom: '-2px', marginRight: '5px' }} /> {tab.title}
                        </div>
                    ) : (
                        <div>
                            <img src={Thumb} style={{ marginBottom: '-4px', marginRight: '5px' }} />
                            Tab anpinnen
                        </div>
                    )}
                </div>
            )}
        </div>
    )
})

export default Tab
