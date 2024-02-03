import ExportButton from '../ExportCSVButton/ExportButton';
import Dropzone from '../Dropzone.tsx';

const Playground = () => {
  return (
    <div>
      <p>Use this page to test out the look of any of your components!</p>
      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />
      <Dropzone/>
    </div>
  );
};

export default Playground;
