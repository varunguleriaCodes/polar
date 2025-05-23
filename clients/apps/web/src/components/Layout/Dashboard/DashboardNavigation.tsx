'use client'

import { schemas } from '@polar-sh/client'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@polar-sh/ui/components/atoms/Sidebar'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import {
  SubRouteWithActive,
  useGeneralRoutes,
  useOrganizationRoutes,
} from '../../Dashboard/navigation'

const MaintainerNavigation = ({
  organization: org,
}: {
  organization: schemas['Organization']
}) => {
  const generalRoutesList = useGeneralRoutes(org)
  const organizationRoutes = useOrganizationRoutes(org)

  const { state } = useSidebar()

  const isCollapsed = state === 'collapsed'

  const dashboardRoutes = [...generalRoutesList, ...organizationRoutes]

  return (
    <SidebarMenu>
      {dashboardRoutes.map((route) => (
        <SidebarMenuItem key={route.link}>
          <SidebarMenuButton tooltip={route.title} asChild>
            <Link
              key={route.link}
              prefetch={true}
              className={twMerge(
                'flex flex-row items-center rounded-lg border border-transparent px-2 transition-colors dark:border-transparent',
                route.isActive
                  ? 'dark:bg-polar-900 dark:border-polar-800 border-gray-200 bg-white text-black shadow-sm dark:text-white'
                  : 'dark:text-polar-500 dark:hover:text-polar-200 text-gray-500 hover:text-black',
                isCollapsed && '!dark:text-polar-600',
              )}
              href={route.link}
            >
              {'icon' in route && route.icon ? (
                <span
                  className={twMerge(
                    'flex flex-col items-center justify-center overflow-visible rounded-full bg-transparent text-[15px]',
                    route.isActive
                      ? 'text-blue-500 dark:text-white'
                      : 'bg-transparent',
                  )}
                >
                  {route.icon}
                </span>
              ) : undefined}
              <span className="ml-2 text-sm font-medium">{route.title}</span>
            </Link>
          </SidebarMenuButton>
          {route.isActive && route.subs && (
            <SidebarMenuSub className="my-2 gap-y-2">
              {route.subs.map((subRoute: SubRouteWithActive) => {
                return (
                  <SidebarMenuSubItem key={subRoute.link}>
                    <Link
                      href={subRoute.link}
                      prefetch={true}
                      className={twMerge(
                        'dark:text-polar-500 ml-4 text-sm font-medium text-gray-500',
                        subRoute.isActive && 'text-blue-500 dark:text-white',
                      )}
                    >
                      {subRoute.title}
                    </Link>
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default MaintainerNavigation
