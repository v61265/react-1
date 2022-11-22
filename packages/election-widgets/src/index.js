import SeatChart from './seat-chart'
import VotesComparison from './votes-comparison'

export default {
  SeatChart: {
    DataLoader: SeatChart.DataLoader,
    ReactComponent: SeatChart.ReactComponent,
  },
  VotesComparison: {
    DataLoader: VotesComparison.DataLoader,
    ReactComponent: VotesComparison.ReactComponent,
  },
}
