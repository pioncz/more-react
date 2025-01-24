import { getRewardData } from './RewardsHelper';
import { styled } from '@/stitches.config';
import Table from '@/components/Table/Table';
import { Reward } from '@/types/types';

const RewardsSingleForm = ({
  rewards,
  form,
  difficulty,
}: {
  rewards: Reward[];
  form: string;
  difficulty: string;
}) => {
  const data = getRewardData(rewards, difficulty, form);

  return (
    <>
      <Title>{form} Form</Title>
      <Table<{ id: string; label?: string; rewards?: Reward[] }>
        columns={columns}
        data={data}
      >
        {(dataItem) =>
          dataItem?.label ||
          dataItem?.rewards?.map((reward) => (
            <div key={reward.id}>{reward.rewards}</div>
          ))
        }
      </Table>
    </>
  );
};

const Title = styled('div', {
  fontSize: '$2',
  textAlign: 'start',
  margin: '$3 0 $1',
});

const columns = [
  {
    id: 'difficulty',
    label: 'Difficulty',
  },
  {
    id: 'trial1',
    label: 'Trial #1',
  },
  {
    id: 'trial2',
    label: 'Trial #2',
  },
  {
    id: 'trial3',
    label: 'Trial #3',
  },
];

export default RewardsSingleForm;
