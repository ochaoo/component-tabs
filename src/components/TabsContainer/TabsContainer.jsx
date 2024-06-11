import './style.scss'
import { useState, useEffect, useRef } from 'react'
import Tab from '../Tab/Tab'
import { initialTabs } from '../../utils/initial'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core'
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import ArrowUp from '../../assets/ArowUp.svg?react'
import Logo from '../../assets/fi-rs-box-alt.svg?react'

const TabsContainer = () => {
    const [tabs, setTabs] = useState(() => {
        const savedTabs = localStorage.getItem('tabs')
        return savedTabs ? JSON.parse(savedTabs) : initialTabs
    })
    const [overflowTabs, setOverflowTabs] = useState([])

    const [pinnedTabs, setPinnedTabs] = useState(tabs.filter((tab) => tab.isPinned))
    const [regularTabs, setRegularTabs] = useState(tabs.filter((tab) => !tab.isPinned))

    const [selectedTab, setSelectedTab] = useState(null)

    const unpinnedRef = useRef(null)

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 2000
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId !== overId) {
            const activeTab = tabs.find((tab) => tab.id === activeId)

            if (activeTab.isPinned) {
                setPinnedTabs((items) => {
                    const oldIndex = items.findIndex((tab) => tab.id === activeId)
                    const newIndex = items.findIndex((tab) => tab.id === overId)
                    return arrayMove(items, oldIndex, newIndex)
                })
            } else {
                setRegularTabs((items) => {
                    const oldIndex = items.findIndex((tab) => tab.id === activeId)
                    const newIndex = items.findIndex((tab) => tab.id === overId)
                    return arrayMove(items, oldIndex, newIndex)
                })
            }
        }
    }

    const togglePin = (tab) => {
        setTabs((prevTabs) => prevTabs.map((t) => (t.id === tab.id ? { ...t, isPinned: !t.isPinned } : t)))
    }

    useEffect(() => {
        localStorage.setItem('tabs', JSON.stringify(tabs))
        setPinnedTabs(tabs.filter((tab) => tab.isPinned))
        setRegularTabs(tabs.filter((tab) => !tab.isPinned))
    }, [tabs])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const tabId = entry.target.dataset.id
                    if (!entry.isIntersecting) {
                        if (!overflowTabs.some((tab) => tab.id === tabId)) {
                            const tab = regularTabs.find((t) => t.id === tabId)
                            setOverflowTabs((prev) => [...prev, tab])
                        }
                    } else {
                        setOverflowTabs((prev) => prev.filter((t) => t.id !== tabId))
                    }
                })
            },
            { root: unpinnedRef.current, threshold: 0.7 }
        )

        const unpinnedElements = document.querySelectorAll('.unpinned-tabs .tab')
        unpinnedElements.forEach((element) => observer.observe(element))

        return () => {
            unpinnedElements.forEach((element) => observer.unobserve(element))
        }
    }, [regularTabs])

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners}
            modifiers={[restrictToParentElement, restrictToHorizontalAxis]}
        >
            <div className="container-wrapper">
                <div className="tabs-container">
                    <div className="pinned-tabs">
                        <SortableContext items={pinnedTabs} strategy={horizontalListSortingStrategy}>
                            {pinnedTabs.map((tab) => (
                                <Tab
                                    className={`${selectedTab === tab.id ? 'selected' : ''}`}
                                    key={tab.id}
                                    tab={tab}
                                    togglePin={togglePin}
                                    setSelectedTab={setSelectedTab}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <div className={`unpinned-tabs ${overflowTabs.length > 0 ? 'unpinned-tabs-shadow' : ''}`} ref={unpinnedRef}>
                        <SortableContext items={regularTabs} strategy={horizontalListSortingStrategy}>
                            {regularTabs.map((tab) => (
                                <Tab
                                    className={`${selectedTab === tab.id ? 'selected' : ''}`}
                                    key={tab.id}
                                    tab={tab}
                                    togglePin={togglePin}
                                    setSelectedTab={setSelectedTab}
                                />
                            ))}
                        </SortableContext>
                    </div>
                </div>

                <div className="overflow-menu">
                    <ArrowUp className="arrow" />
                    {overflowTabs.length > 0 && (
                        <div className="dropdown">
                            {overflowTabs.map((tab) => (
                                <div className="item" key={tab.id}>
                                    <Logo style={{ marginBottom: '-2px', marginRight: '10px' }} className="icon" />
                                    {tab.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DndContext>
    )
}

export default TabsContainer
