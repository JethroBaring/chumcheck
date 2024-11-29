<script lang="ts">

</script>

<div class="flex h-full flex-col gap-3">
  <div class="flex justify-between">
    <div class="bg-background flex h-fit justify-between rounded-lg">
      <Tabs.Root value={selectedTab}>
        <Tabs.List class="bg-flutter-gray/20 border">
          <Tabs.Trigger value="chart" class="capitalize" onclick={() => updateTab('chart')}
            >Chart</Tabs.Trigger
          >
          <Tabs.Trigger value="detailed" class="capitalize" onclick={() => updateTab('detailed')}
            >Detailed</Tabs.Trigger
          >
        </Tabs.List>
      </Tabs.Root>
    </div>
  </div>
    <Card.Root class="h-full">
      <Card.Header class="items-center">
        <Card.Title>Radar Chart - Grid Circle</Card.Title>
        <Card.Description>Showing total visitors for the last 6 months</Card.Description>
      </Card.Header>
      <Card.Content>
        <Chart.Container class="mx-auto aspect-square max-h-[250px]"></Chart.Container>
      </Card.Content>
      <Card.Footer class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <!-- <TrendingUp class="size-4" /> -->
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </Card.Footer>
    </Card.Root>

</div>