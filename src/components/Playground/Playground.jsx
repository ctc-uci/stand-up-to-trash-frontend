import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';

const Playground = () => {
  return (
    <div>
      <p>Use this page to test out the look of any of your components!</p>
      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />

      <AddEventsModal></AddEventsModal>
    </div>
  );
};

export default Playground;
