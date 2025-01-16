import Table from '@/components/Table/Table';
import { styled } from '@/stitches.config';
import { getRewardData } from './RewardsHelper';

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

const RewardsTable = ({ difficulty }: { difficulty: string }) => {
  const ramData = getRewardData(difficulty, 'Ram');

  return (
    <div>
      <Title>Ram Form</Title>
      <Table columns={columns} data={ramData}>
        {(dataItem) =>
          dataItem?.label ||
          dataItem?.rewards?.map((reward) => (
            <div key={reward.id}>{reward.rewards}</div>
          ))
        }
      </Table>
    </div>
  );
};

const Title = styled('div', {
  fontSize: '$2',
  textAlign: 'start',
  margin: '$3 0 $1',
});

export default RewardsTable;
