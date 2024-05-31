<script lang="ts">
    import Home from "lucide-svelte/icons/home";
    import Settings from "lucide-svelte/icons/settings";
    import Grid from 'lucide-svelte/icons/grid-2x2'
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  </script>

<aside class="w-14 h-screen flex-col border-r bg-background sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 py-4">
      <a
        href="/"
        class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <img src="/logo.png" alt="chumcheck logo" class="h-7 w-7"/>
        <span class="sr-only">ChumCheck</span>
      </a>
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <a
            href="/manager/dashboard/pending"
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            use:builder.action
            {...builder}
          >
            <Home class="h-5 w-5" />
            <span class="sr-only">Dashboard</span>
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Dashboard</Tooltip.Content>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <a
            href="/manager/startups"
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            use:builder.action
            {...builder}
          >
            <Grid class="h-5 w-5" />
            <span class="sr-only">Startups</span>
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Startups</Tooltip.Content>
      </Tooltip.Root>
    </nav>
    <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <a
            href="##"
            class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            use:builder.action
            {...builder}
          >
            <Settings class="h-5 w-5" />
            <span class="sr-only">Settings</span>
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Settings</Tooltip.Content>
      </Tooltip.Root>
    </nav>
  </aside>