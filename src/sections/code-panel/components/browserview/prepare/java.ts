export function prepareJavaCode(code: string, test: string): string {
  return `
import java.util.*;
import java.lang.reflect.Method;

${code}
${test}
public class Main {
    public static void main(String[] args) {
        int passed = 0;
        int failed = 0;

        for (Map.Entry<String, Tests.TestCase> entry : Tests.tests.entrySet()) {
            String testName = entry.getKey();
            Tests.TestCase test = entry.getValue();

            int[] inputCopy = test.input.clone();
            try {
                // Call student function
                Method method = StudentCode.class.getMethod(Tests.STUDENT_FN, int[].class);
                int[] result = (int[]) method.invoke(null, (Object) inputCopy);
            } catch (Exception e) {
              Method[] methods = StudentCode.class.getDeclaredMethods();

        for (Method m : methods) {
            System.out.println("Method: " + m.getName());
        }
                System.out.println(testName + " crashed with error: " + e.getMessage());
                failed++;
                continue;
            }

            if (Arrays.equals(inputCopy, test.expected)) {
                passed++;
                System.out.println("✅ " + testName + " Passed");
            } else {
                failed++;
                System.out.println("❌ " + testName + " Failed");
                System.out.println("   Input:    " + Arrays.toString(test.input));
                System.out.println("   Expected: " + Arrays.toString(test.expected));
                System.out.println("   Got:      " + Arrays.toString(inputCopy));
            }
        }

        System.out.println("Summary: " + passed + " Passed, " + failed + " Failed");
    }
}

  `
}
