import RewardsSingleForm from './RewardsSingleForm';

const RewardsTable = ({ difficulty }: { difficulty: string }) => {
  return (
    <div>
      <RewardsSingleForm form="Ram" difficulty={difficulty} />
      <RewardsSingleForm form="Lion" difficulty={difficulty} />
      <RewardsSingleForm form="Viper" difficulty={difficulty} />
    </div>
  );
};

export default RewardsTable;
