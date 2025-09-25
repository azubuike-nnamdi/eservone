
/**
 * App Store compliant tracking utility
 * Minimal implementation that respects user privacy and App Store guidelines
 */

export interface TrackingData {
  action: 'image_pick' | 'image_camera' | 'document_pick' | 'file_upload';
  timestamp: number;
  success: boolean;
  error?: string;
}

export class AppTracking {
  private static isTrackingEnabled: boolean = false;

  /**
   * Initialize tracking - only enable if user explicitly opts in
   */
  static async initializeTracking(): Promise<void> {
    // Only enable tracking if user has explicitly opted in
    // This should be done through a proper consent flow
    this.isTrackingEnabled = false; // Default to disabled for App Store compliance
  }

  /**
   * Track user interaction - only if tracking is enabled
   */
  static async trackInteraction(data: TrackingData): Promise<void> {
    if (!this.isTrackingEnabled) {
      return; // Don't track if user hasn't opted in
    }

    // Only log basic, non-identifying information
    console.log('User interaction:', {
      action: data.action,
      success: data.success,
      timestamp: data.timestamp,
    });
  }

  /**
   * Enable tracking - only call this after user explicitly consents
   */
  static enableTracking(): void {
    this.isTrackingEnabled = true;
  }

  /**
   * Disable tracking
   */
  static disableTracking(): void {
    this.isTrackingEnabled = false;
  }

  /**
   * Check if tracking is enabled
   */
  static isTrackingAllowed(): boolean {
    return this.isTrackingEnabled;
  }
}
