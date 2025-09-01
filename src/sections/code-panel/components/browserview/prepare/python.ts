export function preparePythonCode(code: string, test: string): string {
  return (
    `

${code}

${test}

def main():
    passed = []
    failed = []

    for name, test in tests.items():
        result = globals()[student_fn](test["input"])
        if result == test["output"]:
            passed.append(name)
        else:
            failed.append(name)
            print(f"{name} failed. Got {result}, expected {test['output']}")

    return {
        "passed": passed,
        "failed": failed,
        "all": "Passed" if not failed else "Failed"
    }
        ` + '\n'
  )
}
