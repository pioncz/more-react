import { Reward } from '@/types/types';
import RewardsSingleForm from './RewardsSingleForm';

const RewardsTable = ({
  difficulty,
  rewards,
}: {
  difficulty: string;
  rewards: Reward[];
}) => {
  return (
    <div>
      <RewardsSingleForm
        form="Ram"
        difficulty={difficulty}
        rewards={rewards}
      />
      <RewardsSingleForm
        form="Lion"
        difficulty={difficulty}
        rewards={rewards}
      />
      <RewardsSingleForm
        form="Viper"
        difficulty={difficulty}
        rewards={rewards}
      />
    </div>
  );
};

export default RewardsTable;
