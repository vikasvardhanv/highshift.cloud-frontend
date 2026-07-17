import { motion } from "framer-motion";
import Publisher from '../components/dashboard/Publisher';

export default function Publishing() {
  return (
    <div className="h-full flex flex-col max-w-[1800px] mx-auto">
      <div className="flex-1 min-h-0">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
          <Publisher />
        </motion.div>
      </div>
    </div>
  );
}
