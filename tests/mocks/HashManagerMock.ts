export class HashManagerMock {
  public hash = async (
    plaintext: string
  ): Promise<string> => {
    return "hash-mock"
  }

  public compare = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    switch (plaintext) {
      case "admin123":
        return hash === "admin-hash-mock"

      case "user123":
        return hash === "user-hash-mock"

      default:
        return false
    }
  }
}