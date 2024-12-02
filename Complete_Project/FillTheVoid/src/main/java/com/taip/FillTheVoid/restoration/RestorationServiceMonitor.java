
package com.taip.FillTheVoid.restoration;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

@Aspect
@Component
public class RestorationServiceMonitor {

    private final Logger logger = LoggerFactory.getLogger(RestorationServiceMonitor.class);
    private static final Double THRESHOLD = 0.5;

    public RestorationServiceMonitor() {
    }

    // Pointcut for methods in PaintingService
    @Pointcut("execution(* com.taip.FillTheVoid.restoration.RestorationService.*(..))")
    public void restorationServiceMethods() {}

//    // Verification and correction mechanism: Validate and correct
    @Around("execution(* com.taip.FillTheVoid.restoration.RestorationService.restorePythonCode(..)) && args(selectedModel, cornersList, imageType, image)")
    public Map<String, Object> validateAndCorrect(ProceedingJoinPoint joinPoint, String selectedModel, CornersList cornersList, String imageType, byte[] image) throws Throwable {
        System.out.println("\n-----Inside Restoration Aspect-----\n");
        Map<String, Object> returnValue = (Map<String, Object>) joinPoint.proceed();
        Double score = (Double) returnValue.get("score");
        if (score < THRESHOLD) {
            String outputPath = "..\\GraphFill-main\\val_results\\places\\c2f_iter\\output.png";
            String modelVersion = "python main.py config=main.yaml util_args.predict_only=False util_args.eval_mode=True data=places_256";
            RestorationService restorationService = new RestorationService();
            Map<String, Object> newReturnValue = restorationService.restorePythonCodeCustom(selectedModel, cornersList, imageType, image, modelVersion, outputPath);
            if ((Double) newReturnValue.get("score") > score) {
                return newReturnValue;
            }
            else {
                return returnValue;
            }
        }
        else
        {
            return returnValue;
        }
    }

//    @AfterReturning(pointcut = "restorationServiceMethods()", returning = "result")
//    public void afterReturningAdvice(JoinPoint joinPoint, Object result) {
//        logger.info("MOP: Metoda " + joinPoint.getSignature().getName() + " a fost executată.");
//        if (result != null) {
//            logger.info("MOP: Rezultatul metodei: " + result);
//        }
//    }
//
//    @AfterThrowing(pointcut = "restorationServiceMethods()", throwing = "exception")
//    public void logExceptions(JoinPoint joinPoint, Throwable exception) {
//        logger.error("MOP: O excepție a fost aruncată în metoda " + joinPoint.getSignature().getName());
//        logger.error("MOP: Detalii excepție: ", exception);
//    }

}