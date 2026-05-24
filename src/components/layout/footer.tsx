"use client"
import { Layout } from "@/components/page/layout"
import { LINKS } from "@/features/navigation/Links"
import { motion } from "framer-motion"
import Link from "next/link"

export const Footer = () => {
  return (
    <Layout asChild padding="none" className="gap-5 pb-8">
      <footer>
        <Link href={LINKS.Home.href()} className="self-center">
          {/* <LogoNameSvg className="h-10 w-auto" /> */}
          57emREGIMENT TODO
        </Link>
        <div className="flex flex-col justify-around gap-8 md:flex-row">
          {/* SAMPLE */}
          {/* {getFooterLinks().map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <Typography
                variant="h4"
                as={"h2"}
                className="self-center md:self-auto"
              >
                {t(group.title)}
              </Typography>
              <nav className="flex flex-col gap-2">
                {group.links.map((link) =>
                  !link.disabled ? (
                    <Link key={link.href} {...link}>
                      <Typography
                        variant="default"
                        className="text-foreground/40 hover:text-foreground/80"
                      >
                        {t(link.label)}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography
                      key={link.href}
                      variant="default"
                      className="cursor-not-allowed text-muted"
                    >
                      {t(link.label)} (Soon)
                    </Typography>
                  )
                )}
              </nav>
            </div>
          ))} */}
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between border-t border-input pt-8 text-input md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm text-gray-400 md:mb-0">
            {/* TODO */}
            {/* © {new Date().getFullYear()} {SiteConfig.title}. All rights */}©{" "}
            {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Version 0.0.1</span>
            {/* <span>Version {env.NEXT_PUBLIC_APP_VERSION}</span> */}
            {/* <span>•</span>
            <span>Serveurs: Unknown</span> */}
            <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
          </div>
        </motion.div>
      </footer>
    </Layout>
  )
}
