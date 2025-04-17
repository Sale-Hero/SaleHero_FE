import style from "../../../assets/scss/common/main.module.scss";
import cropped_logo from "../../../assets/img/koreer_logo_cropped.png";
import { motion } from "framer-motion";

export function CompanyInformationField() {
    return (
        <motion.div 
            className={style.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className={style.headingText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                북미 취업을<br />희망하세요?
            </motion.div>
            
            <motion.div 
                className={style.subText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                코리어와 함께<br/>
                커리어를 성장,<br/>
                글로벌시장으로 나아가보세요.
            </motion.div>
            
            <motion.div 
                className={style.imageBanner}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            >
                <img 
                    src={cropped_logo} 
                    alt="Global Opportunities" 
                    className={style.bannerImage}
                />
            </motion.div>
            
            <motion.div 
                className={style.callToAction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                어느곳으로 해외취업을 희망하시나요?
            </motion.div>
            
            <motion.div 
                className={style.buttonsContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <motion.button 
                    className={style.choiceButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    USA
                </motion.button>
                <motion.button 
                    className={style.choiceButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    CANADA
                </motion.button>
                <motion.button 
                    className={style.choiceButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ASIA
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
