import ExportButton from '../ExportCSVButton/ExportButton';

const Playground = () => {
  return (
    <div>
      <p>Use this page to test out the look of any of your components!</p>
      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />
    </div>
  );
};

export default Playground;
