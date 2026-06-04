import SwiftUI

struct FlagImageView: View {
    let code: String
    var size: CGFloat = 60
    var cornerRadius: CGFloat = 8

    private var flagURL: URL {
        URL(string: "https://flagcdn.com/w320/\(code.lowercased()).png")!
    }

    var body: some View {
        AsyncImage(url: flagURL) { phase in
            switch phase {
            case .empty:
                RoundedRectangle(cornerRadius: cornerRadius)
                    .fill(Color.gray.opacity(0.25))
                    .frame(width: size * 1.5, height: size)

            case .success(let image):
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: size * 1.5, height: size)
                    .clipShape(RoundedRectangle(cornerRadius: cornerRadius))

            case .failure:
                ZStack {
                    RoundedRectangle(cornerRadius: cornerRadius)
                        .fill(Color.gray.opacity(0.15))
                    Text("🏳️")
                        .font(.system(size: size * 0.5))
                }
                .frame(width: size * 1.5, height: size)

            @unknown default:
                RoundedRectangle(cornerRadius: cornerRadius)
                    .fill(Color.gray.opacity(0.25))
                    .frame(width: size * 1.5, height: size)
            }
        }
        .frame(width: size * 1.5, height: size)
    }
}

#Preview {
    VStack(spacing: 16) {
        FlagImageView(code: "US", size: 60)
        FlagImageView(code: "GB", size: 80)
        FlagImageView(code: "JP", size: 40, cornerRadius: 4)
    }
    .padding()
}
