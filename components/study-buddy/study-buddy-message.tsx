import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type MessageProps = {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function StudyBuddyMessage({ message }: MessageProps) {
  const isUser = message.role === "user"
  const isSystemNotice = message.role === "assistant" && message.content.startsWith("⚠️")

  return (
    <div className={cn("flex items-start gap-3", isUser ? "flex-row-reverse" : "")}>
      {!isSystemNotice && (
        <Avatar className={cn("h-8 w-8", isUser ? "bg-purple-600" : "bg-white border border-purple-200")}>
          <AvatarFallback>
            {isUser ? (
              "U"
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white text-purple-600 font-bold">G</div>
            )}
          </AvatarFallback>
        </Avatar>
      )}

      <Card
        className={cn(
          "max-w-[80%]",
          isUser ? "bg-purple-600 text-white" : isSystemNotice ? "bg-yellow-50 border-yellow-200" : "bg-white",
        )}
      >
        <CardContent className="p-3 text-sm whitespace-pre-wrap">{message.content}</CardContent>
      </Card>
    </div>
  )
}
