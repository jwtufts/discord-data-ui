import { IconUser } from '@tabler/icons-react'
import styles from './userOverview.module.css'
import { UserDropdown } from './components/UserDropdown'
import { DataCard } from './components/DataCard'
import { useMessagesByUser } from '../../hooks/useMessagesByUser'
import { useUserOverviewStore } from '../../hooks/useUserOverviewStore'
import { DateTime } from 'luxon';
import { useVoiceMinByUser } from '../../hooks/useVoiceMinByUser'
import { useUserRank } from '../../hooks/useUserRank'
import { groupMessagesByDay } from '../../utils/groupMessagesByDay'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getChartOptions } from './getChartOptions'
import { useVoiceExpEvents } from '../../hooks/useVoiceExpEvents'
import { groupVoiceTimeByDay } from '../../utils/groupVoiceTimeByDay'
import { groupExpByDay } from '../../utils/groupExpByDay'
import { getCSSVar } from '../../utils/getCSSVar'

export const UserOverview = () => {
  const startWeek = DateTime.now().startOf('week').startOf('day').toISO();
  const startMonth = DateTime.now().startOf('month').startOf('day').toISO();

  const { selectedUser } = useUserOverviewStore((state) => ({ selectedUser: state.selectedUser }));
  const { data: weeklyMessages } = useMessagesByUser(selectedUser, startWeek, DateTime.now().toISO())
  const { data: monthlyMessages } = useMessagesByUser(selectedUser, startMonth, DateTime.now().toISO())
  const { data: voiceMinWeekly } = useVoiceMinByUser(selectedUser, startWeek, DateTime.now().toISO())
  const { data: voiceMinMonthly } = useVoiceMinByUser(selectedUser, startMonth, DateTime.now().toISO())
  const { data: userRank } = useUserRank(selectedUser);
  const { data: allMessages } = useMessagesByUser(selectedUser, null, DateTime.now().toISO());
  const { data: expEvents } = useVoiceExpEvents(selectedUser, null, null, DateTime.now().toISO());

  const voiceExpEvents = expEvents?.filter((expEvent) => expEvent.reason === "voice");

  const dailyMessages = groupMessagesByDay(allMessages);
  const dailyVoice = groupVoiceTimeByDay(voiceExpEvents);
  const dailyExp = groupExpByDay(expEvents, false);
  const dailyUnboostedExp = groupExpByDay(expEvents, true);

  const messageChartOptions: Highcharts.Options = getChartOptions([{
    name: "Messages",
    data: dailyMessages,
    color: getCSSVar('--discord-primary')
  }], 'Messages Over Time', 'Messages');
  const voiceChartOptions: Highcharts.Options = getChartOptions([{
    name: "Time in Voice",
    data: dailyVoice,
    color: getCSSVar('--discord-primary')
  }], 'Hours in Voice Over Time', 'Hours in Voice');
  const expChartOptions: Highcharts.Options = getChartOptions([
    {
      name: "XP",
      data: dailyExp,
      color: getCSSVar('--discord-primary'),
    },
    {
      name: "Unboosted XP",
      data: dailyUnboostedExp,
      color: getCSSVar('--secondary-color'),
    },
  ], 'XP per Day', 'XP Gained');

  return (
    <div>
      <div className={styles.userSelectorWrapper}>
        <span className={styles.title}><IconUser size={14} /><span>User: </span></span>
        <UserDropdown />
      </div>
      <div className={styles.userDataWrapper}>
        <div className={styles.dataCards}>
          <DataCard title="Messages this Week" data={weeklyMessages?.length ?? ''} />
          <DataCard title="Voice Hours this Week" data={voiceMinWeekly != null
            ? (voiceMinWeekly / 60).toFixed(2)
            : ''} />
          <DataCard title="Messages this Month" data={monthlyMessages?.length ?? ''} />
          <DataCard title="Voice Hours this Month" data={voiceMinMonthly != null
            ? (voiceMinMonthly / 60).toFixed(2)
            : ''} />
          <DataCard title="Current Rank" data={userRank?.total ?? ''} />
          <DataCard title="Weekly Rank" data={userRank?.weekly ?? ''} />
          <DataCard title="Monthly Rank" data={userRank?.monthly ?? ''} />
          <DataCard title="Yearly Rank" data={userRank?.yearly ?? ''} />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <HighchartsReact highcharts={Highcharts} options={messageChartOptions} />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <HighchartsReact highcharts={Highcharts} options={voiceChartOptions} />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <HighchartsReact highcharts={Highcharts} options={expChartOptions} />
        </div>
      </div>
    </div>
  )
}